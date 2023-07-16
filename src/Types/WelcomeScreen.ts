import { WelcomeScreenChannel } from './WelcomeScreenChannel';

export interface WelcomeScreen {
  description: string;
  welcomeChannels: Array<WelcomeScreenChannel>;
}