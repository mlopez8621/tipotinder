export class UserProfileDto {
    id: string;
    name: string;
    email: string;
    gender: string;
    bio: string;
    age: number;
    photo_url: string | null;
    location: {
      lat: number;
      lon: number;
    };
  }
  