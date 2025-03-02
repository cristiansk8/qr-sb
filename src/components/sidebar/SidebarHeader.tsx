import { Logo } from '../Logo';
import { AlignJustify } from 'lucide-react';

export const SidebarHeader = () => (
    <div className='flex flex-row px-4 md:px-0 justify-between'>
        <button className='md:hidden'>
            <AlignJustify />
        </button>
        <div className='flex md:pl-6 py-3'>
            <Logo />
        </div>
    </div>
);