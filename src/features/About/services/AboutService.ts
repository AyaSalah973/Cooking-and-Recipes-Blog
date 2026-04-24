import type { AboutPageData } from "../types";

export const homeService = {
  getAboutData: (): AboutPageData => {
    return {
      heroTitle: 'WELCOME TO MY CULINARY HAVEN!',
      aboutContent: `Born and raised in the vibrant culinary landscape of Italy, my journey with food began in the heart of my family's kitchen. Surrounded by the aroma of fresh herbs, the sizzle of pans, and the laughter of loved ones, I developed a deep appreciation for the art of cooking. My culinary education took me from the historic streets of Rome to the bustling markets of Florence, where I honed my skills and cultivated a love for the simplicity and authenticity of Italian cuisine.

Driven by a relentless curiosity, I embarked on a global culinary exploration, seeking inspiration from the rich tapestry of flavors found in kitchens around the world. From the spicy markets of Marrakech to the sushi stalls of Tokyo, each experience added a unique brushstroke to my culinary canvas.

Whether you're a seasoned home cook or just starting your culinary adventure, I'm delighted to have you here. Let's stir, simmer, and savor the beauty of creating something wonderful together.`,
      signatureChef: 'Isabella Russo',
    };
  },
};