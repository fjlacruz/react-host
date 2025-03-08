// remoteModules.ts
import React, { lazy } from 'react';

export const moduleMap = {
    [import.meta.env.VITE_REMOTE_BUTTON_REF]: lazy(() =>
        import(/* @vite-ignore */ import.meta.env.VITE_REMOTE_BUTTON_MODULE)
    ),
    [import.meta.env.VITE_REMOTE_BUTTON2_REF]: lazy(() =>
        import(/* @vite-ignore */ import.meta.env.VITE_REMOTE_BUTTON2_MODULE)
    ),
};