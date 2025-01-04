import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Save } from 'lucide-react';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import useAuth from '../hooks/useAuth';

interface Props extends DialogProps {}

const SettingsDialog = ({ open, onOpenChange }: Props) => {
    const { logout } = useAuth();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>Configure your preferences</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="dark">Dark Mode</Label>
                        <Switch id="dark" defaultChecked={true} disabled />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-scroll">Auto Scroll</Label>
                        <Switch id="auto-scroll" />
                    </div>

                    {/* Profanity, Sound */}
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="profanity-filter">Profanity Filter</Label>
                        <Switch id="profanity-filter" />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="sound">Sound</Label>
                        <Switch id="sound" />
                    </div>
                </div>
                {/* <DialogFooter>
                    <Button size={'sm'} onClick={() => onOpenChange(false)}>
                        Save <Save className="ml-2 size-4" />
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
