import { DotMenu } from '../ui/Icon';
import Text from '../ui/Text';
import Button from '../ui/Button';
import './DashboardCard.css'; // Import the CSS file


const DashboardCard = ({
    title,
    productId,
    src,
    removeProducts,
    date,
    quantity = 100, // Add a quantity prop
    
}) => {

    return (
        <div className="dashboard-card">
            <div className="menu-container">
                <div className="group">
                    <DotMenu className="dot-menu" />
                    <ul className="hidden hover-nav group-hover:flex">
                        <li>Edit</li>
                        <li
                            role="button"
                            aria-label={`Remove ${title}`}
                            onClick={() => removeProducts(productId)}
                        >
                            Remove
                        </li>
                    </ul>
                </div>
            </div>
            <div className="image-container">
                <div className="image-wrapper">
                    <img
                        src={src}
                        alt={title}
                        className="object-cover rounded-full"
                    />
                </div>
                <Text variant="price" className="title">
                    {title}
                </Text>
                <Text variant="infoXs" className="date">
                    {date}
                </Text>
            </div>
            <div className="footer">
                <Text variant="infoXs" className='title'>{quantity} Left</Text> {/* Dynamic quantity */}
                <Button variant="outline" title="View" />
            </div>
        </div>
    );
};

export default DashboardCard;
