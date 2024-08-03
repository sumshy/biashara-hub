import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Provider, { IProvider } from '../models/Provider';
import { encPassword, verifyPassword } from '../utils/password';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Merchant, { IMerchant } from '../models/Merchant';

dotenv.config();

const findUserOrProvider = async (email: string, password: string) => {
    const user = await User.findOne({ email }).select('+password');
    if (user) {
        return { entity: user, hashedPassword: user.password as string };
    }

    const provider = await Provider.findOne({ email }).select('+password');
    if (provider) {
        return { entity: provider, hashedPassword: provider.password as string };
    }

    return null;
};

const getLicenseId = async (userId: string) => {
    const checkMerchant = await Merchant.findOne({ userId });
    return checkMerchant?.licenseId || 0;
};

export const seekerSignUp = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, phone, password, role } = req.body;
        const name = username;
        const hashedPassword = await encPassword(password);
        const user = new User({ name, email, phone, password: hashedPassword, role });
        const result = await user.save();
        const resultObject = result.toObject();
        res.json({ status: 'Success', message: 'User registered successfully.' });
    }
);

export const providerSignUp = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, phone, location, description, password, role } = req.body;
        const name = username;
        const hashedPassword = await encPassword(password);
        const provider = new Provider({ name, email, phone, location, description, password: hashedPassword, role });
        const result = await provider.save();
        const resultObject = result.toObject();
        res.json({ status: 'Success', message: 'Provider registered successfully.' });
    }
);

export const providerSignUpAndBecomeMerchant = [
    asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, phone, location, description, password, role } = req.body;

        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ status: 'Error', message: 'Provider with this email already exists.' });
        }

        const hashedPassword = await encPassword(password);

        const provider = new Provider({
            name: username,
            email,
            phone,
            location,
            description,
            password: hashedPassword,
            role
        });

        const savedProvider = await provider.save();

        const userId = savedProvider._id;
        const merchant = new Merchant<IMerchant>({ userId, licenseId: 'test' });
        const savedMerchant = await merchant.save();

        res.status(201).json({
            status: 'Success',
            message: 'Provider registered and automatically made a merchant.',
            provider: savedProvider,
            merchant: savedMerchant
        });
    })
];

export const login = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const lowerCaseEmail = email.toLowerCase();

        const user = await findUserOrProvider(lowerCaseEmail, password);

        if (!user) {
            return next(createHttpError(404, 'User not found'));
        }

        const { entity, hashedPassword } = user;

        const isMatch = await verifyPassword(password, hashedPassword);

        if (!isMatch) {
            return next(createHttpError(404, 'Wrong password'));
        }

        const result = entity.toObject();
        delete result.password;

        const licenseId = await getLicenseId(result._id);
        const token = jwt.sign(result, process.env.JWT_SECRET_KEY!);

        res.cookie('ezToken', token);
        res.json({ status: 'Success', licenseId, ...result, token });
    }
);

export const resetSeekerPassword = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const hashedPassword = await encPassword(password);

        const user: IUser | null = await User.findOneAndUpdate(
            {
                email: email.toLowerCase(),
            },
            { password: hashedPassword },
            {
                new: true,
            }
        );
        if (user) {
            res.json({ status: 'Success', message: 'Password changed' });
        } else {
            next(createHttpError(404, 'User not found'));
        }
    }
);

export const resetProviderPassword = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const hashedPassword = await encPassword(password);

        const user: IProvider | null = await Provider.findOneAndUpdate(
            {
                email: email.toLowerCase(),
            },
            { password: hashedPassword },
            {
                new: true,
            }
        );
        if (user) {
            res.json({ status: 'Success', message: 'Password changed' });
        } else {
            next(createHttpError(404, 'User not found'));
        }
    }
);