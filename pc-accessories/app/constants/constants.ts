import {BsBox2Fill, BsFillMotherboardFill, BsGpuCard} from "react-icons/bs";
import {GiProcessor} from "react-icons/gi";
import {FiHardDrive} from "react-icons/fi";
import {FaMemory} from "react-icons/fa";
import {MdOutlineElectricBolt} from "react-icons/md";


export const Exceptions = {
    INVALID_CREDENTIALS: 'Invalid credentials.',
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    BRAND_CREATED_ERROR: 'Error creating brand. Please try again.',
    PRODUCT_CREATED_ERROR: 'Error creating product. Please try again.',
    ERROR_PARSING_SPECS: 'Error while parsing specs, make sure you provided a correct value'
};

export const Success = {
    SIGNED_IN: 'Signed in.',
    BRAND_CREATED: 'Brand created successfully.',
    PRODUCT_CREATED: 'Product created successfully.'
};


export const CategoryIcons = {
    CPUs: GiProcessor,
    GPUs: BsGpuCard,
    Motherboards: BsFillMotherboardFill,
};

export const Roles = {
    ADMIN: 'admin',
    user: 'user',
};


// export const allCategories = [
//     {
//         label: 'CPUs',
//         icon: GiProcessor,
//         description: 'Central processing unit',
//     },
//     {
//         label: 'Motherboards',
//         icon: BsFillMotherboardFill,
//         description: 'Motherboard',
//     },
//     {
//         label: 'RAM',
//         icon: FaMemory,
//         description: 'Random-access memory'
//     },
//     {
//         label: 'Storage',
//         icon: FiHardDrive,
//         description: 'HDD/SSD'
//     },
//     {
//         label: 'GPUs',
//         icon: BsGpuCard,
//         description: 'Graphics processing unit'
//     },
//     {
//         label: 'PSU',
//         icon: MdOutlineElectricBolt,
//         description: 'Power supply unit'
//     },
//     {
//         label: 'Cases',
//         icon: BsBox2Fill,
//         description: 'Case'
//     },
// ];
