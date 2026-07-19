import type { Language, SocialChannel } from '../../types';

export const siteName = "AxonXcode";
export const logo = "/assets/simple-logo-X-decoreted-no-background.png";
export const brandXImage = "/assets/axon-x-letter.png";
export const contactEmail = "Aamr.alawad@gmail.com";
export const phone = "+31685582647";
export const location: Record<Language, string> = {
    en: "Heerlen, The Netherlands",
    nl: "Heerlen, Nederland",
    ar: "هيرلن, هولندا",
};
export const socials: SocialChannel[] = [
    { id: '1', platform: 'Instagram', icon: 'fa-instagram', link: 'https://instagram.com' },
    { id: '2', platform: 'Facebook', icon: 'fa-facebook', link: 'https://www.facebook.com/profile.php?id=61587772950053' },
    { id: '3', platform: 'LinkedIn', icon: 'fa-linkedin', link: 'https://www.linkedin.com/in/aamr-alawad-35444b361' },
    { id: '4', platform: 'GitHub', icon: 'fa-github', link: 'https://github.com/Aamr-IQsolution' },
];
