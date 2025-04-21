import {z} from 'zod';

export const userDataSchema = z.object({    
    name:z.string().nonempty("Name can't be empty ").min(3,"Name must be at least 3 characters").max(20,"Name must be at most 20 characters"),
    email:z.string().email("Email is required"),
    password:z.string().min(6,"Password must be at least 6 characters")
});