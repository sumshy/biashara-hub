'use client';
import React from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const StarIcon = ({ rating = 1 }) => {
    const stars = Array.from({ length: rating }, (_, index) => (
        <StarOutlinedIcon
            key={index}
            sx={{ fontSize: '14px', color: '#fdb11a' }}
        />
    ));

    return <>{stars}</>;
};

export const RightArrow = () => {
    return <ArrowRightAltOutlinedIcon />;
};

export const CircleRightArrow = () => {
    return <ArrowCircleRightOutlinedIcon />;
};

export const LeftArrow = () => {
    return <ArrowBackIosIcon />;
};

export const Rocket = () => {
    return <RocketLaunchIcon />;
};

export const Heart = ({ size }) => {
    return <FavoriteBorderOutlinedIcon fontSize={size} />;
};

export const Remove = ({ className }) => {
    return <RemoveCircleOutlineIcon className={className} />;
};

export const DotMenu = ({ className }) => {
    return <MoreVertIcon className={className} />;
};
