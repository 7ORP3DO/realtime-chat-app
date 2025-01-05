import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useSettingsContext } from '../context/settings-context';

interface Props extends DialogProps {}

const SettingsDialog = ({ open, onOpenChange }: Props) => {
    const { settings, updateSetting } = useSettingsContext();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>Configure your preferences</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-scroll">Auto Scroll</Label>
                        <Switch
                            id="auto-scroll"
                            checked={settings['autoScroll']}
                            onCheckedChange={e => updateSetting('autoScroll', e)}
                        />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="scrollIndicator">Scroll Indicator</Label>
                        <Switch
                            id="scrollIndicator"
                            checked={settings['scrollIndicator']}
                            onCheckedChange={e => updateSetting('scrollIndicator', e)}
                        />
                    </div>

                    {/* Profanity, Sound */}
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="profanity-filter">Profanity Filter</Label>
                        <Switch
                            id="profanity-filter"
                            checked={settings['profanityFilter']}
                            onCheckedChange={e => updateSetting('profanityFilter', e)}
                        />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="sound">Sound</Label>
                        <Switch
                            id="sound"
                            checked={settings['soundEnabled']}
                            onCheckedChange={e => updateSetting('soundEnabled', e)}
                        />
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
