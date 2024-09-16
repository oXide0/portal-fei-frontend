import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface BreadcrumbProps {
    links: { name: string; path: string }[];
}

const Breadcrumbs = ({ links }: BreadcrumbProps) => {
    return (
        <nav className="flex text-gray-700 text-sm mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {links.map((link, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index !== links.length - 1 ? (
                            <Link to={link.path} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                                {link.name}
                                <ChevronRightIcon className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span className="text-gray-500">{link.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
