import { auth } from '@/auth';
import { Logo } from '../Logo';
import { MENU_ITEMS } from './MenuItems';
import { SidebarHeader } from './SidebarHeader';
import { SidebarProfile } from './SidebarProfile';
import { SidebarMenuItem } from './MenuItem';
import SignoutButton from '../auth/SignoutButton';

export const Sidebar = async () => {
    const session = await auth();

    return (
        <div>
            <SidebarHeader />
            <div className="hidden md:block relative h-full max-h-screen bg-white min-h-screen w-64 border-r shadow-sm">
                <div>
                    <SidebarProfile user={{
                        image: session?.user?.image || undefined, // Convierte null a undefined
                        name: session?.user?.name
                    }} />
                    <nav className="pl-2">
                        {MENU_ITEMS.map(item => (
                            <SidebarMenuItem key={item.path} {...item} />
                        ))}
                    </nav>
                </div>
                <div className="absolute bottom-0 w-full">
                    <SignoutButton className="w-full rounded" />
                </div>
            </div>
        </div>
    );
};