import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_METHOD = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_METHOD, true);
