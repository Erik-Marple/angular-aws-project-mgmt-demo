import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SafeUrl } from '@angular/platform-browser';

export interface IResourceItem {
    title: string;
    description: string;
    icon: IconDefinition;
    details: string;
    url?: SafeUrl;
}
