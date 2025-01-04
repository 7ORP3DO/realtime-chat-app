import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

interface Props extends AlertDialogProps {}

const LogoutDialog = ({ open, onOpenChange }: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {/* can login again by entering his name from same browser */}
                        Are you sure you want to logout? If you logout, you can login again by entering your name from
                        the same browser.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='gap-2'>
                    {/* @ts-ignore */}
                    <Button variant={'secondary'} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    {/* @ts-ignore */}
                    <Button variant={'destructive'} onClick={() => onOpenChange(false)}>
                        Logout <LogOut className="size-4" />{' '}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutDialog;
