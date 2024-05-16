/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\examples\ittf\error-f.ts.ittf
    utc time: Fri, 10 May 2024 12:49:23 GMT
*/
import {type Config} from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';
import radixPlugin from 'tailwindcss-radix';
import {marketingPreset} from './app/routes/_marketing+/tailwind-preset';
import {extendedTheme} from './app/utils/extended-theme.ts';
export default {
            content: [
                './app/**/*.{ts,tsx,jsx,js}'
            ], 
            darkMode: 'class', 
            theme: {
                container: {
                    center: true, 
                    padding: '2rem', 
                    screens: {
                        '2xl': '1400px'
                     }
                 }, 
                extend: extendedTheme
             }, 
            presets: [
                marketingPreset
            ], 
            plugins: [
                animatePlugin, 
                radixPlugin
            ]
         } satisfies Config
