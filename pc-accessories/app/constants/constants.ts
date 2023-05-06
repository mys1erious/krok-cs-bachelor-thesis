import {BsBox2Fill, BsFillMotherboardFill, BsGpuCard} from "react-icons/bs";
import {GiProcessor} from "react-icons/gi";
import {FiHardDrive} from "react-icons/fi";
import {FaMemory} from "react-icons/fa";
import {MdOutlineElectricBolt} from "react-icons/md";


export const Exceptions = {
    INVALID_CREDENTIALS: 'Invalid credentials.',
    SOMETHING_WENT_WRONG: 'Something went wrong.'
};

export const Success = {
    SIGNED_IN: 'Signed in.'
};


export const allCategories = [
    {
        label: 'CPUs',
        icon: GiProcessor,
        description: 'Central processing unit',
    },
    {
        label: 'Motherboards',
        icon: BsFillMotherboardFill,
        description: 'Motherboard',
    },
    {
        label: 'RAM',
        icon: FaMemory,
        description: 'Random-access memory'
    },
    {
        label: 'Storage',
        icon: FiHardDrive,
        description: 'HDD/SSD'
    },
    {
        label: 'GPUs',
        icon: BsGpuCard,
        description: 'Graphics processing unit'
    },
    {
        label: 'PSU',
        icon: MdOutlineElectricBolt,
        description: 'Power supply unit'
    },
    {
        label: 'Cases',
        icon: BsBox2Fill,
        description: 'Case'
    },
];
