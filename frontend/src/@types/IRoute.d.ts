import { FC, ReactNode } from 'react';

export interface IRoute {
    path: string;
    component: FC;
}