
export { default as Header } from './Header';
export { default as Sidebar } from './Sidebar';
export { default as Footer } from './Footer';
export { default as MainLayout } from './MainLayout';
import { Sidebar } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const LayoutComponents = {
  Sidebar,
  ScrollArea,
  Separator
};
