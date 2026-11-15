/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-unused-vars -- React interface merging requires identical unused generic type parameters */

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    popover?: '' | 'auto' | 'manual' | 'hint';
    popovertarget?: string;
    popovertargetaction?: 'toggle' | 'show' | 'hide';
    closedby?: 'any' | 'closerequest' | 'none';
    command?: string;
    commandfor?: string;
  }

  interface ButtonHTMLAttributes<T> {
    popovertarget?: string;
    popovertargetaction?: 'toggle' | 'show' | 'hide';
    command?: string;
    commandfor?: string;
  }

  interface DialogHTMLAttributes<T> {
    closedby?: 'any' | 'closerequest' | 'none';
  }
}

export {};
