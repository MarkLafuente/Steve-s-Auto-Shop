import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color design tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ?{
        //background
            whiteBackground: {
                100: "#fdfdfe",
                200: "#fbfbfc",
                300: "#f9fafb",
                400: "#f7f8f9",
                500: "#f5f6f8",
                600: "#c4c5c6",
                700: "#939495",
                800: "#626263",
                900: "#313132"
            },
            blackBackground: {
                100: "#cfcfd1",
                200: "#9ea0a2",
                300: "#6e7074",
                400: "#3d4145",
                500: "#0d1117",
                600: "#0a0e12",
                700: "#080a0e",
                800: "#050709",
                900: "#030305"
            },
            logoBlue: {
                100: "#d6e3ec",
                200: "#adc7da",
                300: "#85acc7",
                400: "#5c90b5",
                500: "#3374a2",
                600: "#295d82",
                700: "#1f4661",
                800: "#142e41",
                900: "#0a1720"
            },
            logoGreen: {
                100: "#e8fbf3",
                200: "#d2f7e6",
                300: "#bbf3da",
                400: "#a5efcd",
                500: "#8eebc1",
                600: "#72bc9a",
                700: "#558d74",
                800: "#395e4d",
                900: "#1c2f27"
            },
            textfieldGray: {
                100: "#d2d2d2",
                200: "#a5a5a5",
                300: "#787878",
                400: "#4b4b4b",
                500: "#1e1e1e",
                600: "#181818",
                700: "#121212",
                800: "#0c0c0c",
                900: "#060606"
            },
            blue: {
                100: "#d2eaff",
                200: "#a5d4ff",
                300: "#79bfff",
                400: "#4ca9ff",
                500: "#1f94ff",
                600: "#1976cc",
                700: "#135999",
                800: "#0c3b66",
                900: "#061e33"
            },
            grayCard: {
                100: "#d5d5d5",
                200: "#acacac",
                300: "#828282",
                400: "#595959",
                500: "#2f2f2f",
                600: "#262626",
                700: "#1c1c1c",
                800: "#131313",
                900: "#090909"
            },
            bluegreen: {
                100: "#d0f1ed",
                200: "#a1e3db",
                300: "#72d4ca",
                400: "#43c6b8",
                500: "#14b8a6",
                600: "#109385",
                700: "#0c6e64",
                800: "#084a42",
                900: "#042521"
            },
            editGray: {
                100: "#dfdedd",
                200: "#bfbdbc",
                300: "#9e9c9a",
                400: "#7e7b79",
                500: "#5e5a57",
                600: "#4b4846",
                700: "#383634",
                800: "#262423",
                900: "#131211"
            },

            //cards
            blueCard: {
                100: "#ced4d8",
                200: "#9da9b0",
                300: "#6d7e89",
                400: "#3c5361",
                500: "#0b283a",
                600: "#09202e",
                700: "#071823",
                800: "#041017",
                900: "#02080c"
            },
            greenCard: {
                100: "#cfd5d3",
                200: "#9faba6",
                300: "#6f827a",
                400: "#3f584d",
                500: "#0f2e21",
                600: "#0c251a",
                700: "#091c14",
                800: "#06120d",
                900: "#030907"
            },
            orangeCard: {
                100: "#d3d2d0",
                200: "#a7a5a2",
                300: "#7c7973",
                400: "#504c45",
                500: "#241f16",
                600: "#1d1912",
                700: "#16130d",
                800: "#0e0c09",
                900: "#070604"
            },
            redCard: {
                100: "#d7d0d1",
                200: "#afa1a3",
                300: "#867376",
                400: "#594C4C",
                500: "#36151a",
                600: "#2b1115",
                700: "#200d10",
                800: "#16080a",
                900: "#0b0405"
            },
            purpleCard: {
                100: "#d5d2da",
                200: "#aba5b5",
                300: "#80798f",
                400: "#564c6a",
                500: "#2c1f45",
                600: "#231937",
                700: "#1a1329",
                800: "#120c1c",
                900: "#09060e"
            },
            blueChart: {
                100: "#d7f2fe",
                200: "#afe5fc",
                300: "#88d7fb",
                400: "#60caf9",
                500: "#38bdf8",
                600: "#2d97c6",
                700: "#227195",
                800: "#164c63",
                900: "#0b2632"
            },
            purpleChart: {
                100: "#e0e0fc",
                200: "#c1c2f9",
                300: "#a1a3f7",
                400: "#8285f4",
                500: "#6366f1",
                600: "#4f52c1",
                700: "#3b3d91",
                800: "#282960",
                900: "#141430"
            },
            orangeChart: {
                100: "#fdecce",
                200: "#fbd89d",
                300: "#f9c56d",
                400: "#f7b13c",
                500: "#f59e0b",
                600: "#c47e09",
                700: "#935f07",
                800: "#623f04",
                900: "#312002"
            },
            greenChart: {
                100: "#d3f3df",
                200: "#a7e8bf",
                300: "#7adc9e",
                400: "#4ed17e",
                500: "#22c55e",
                600: "#1b9e4b",
                700: "#147638",
                800: "#0e4f26",
                900: "#072713"
            },
            redChart: {
                100: "#fcdada",
                200: "#f9b4b4",
                300: "#f58f8f",
                400: "#f26969",
                500: "#ef4444",
                600: "#bf3636",
                700: "#8f2929",
                800: "#601b1b",
                900: "#300e0e"
            },
            
        }
       
        
        //light mode
    : {
            whiteBackground: {
                100: "#fdfdfe",
                200: "#fbfbfc",
                300: "#f9fafb",
                400: "#f7f8f9",
                500: "#f5f6f8",
                600: "#c4c5c6",
                700: "#939495",
                800: "#626263",
                900: "#313132"
            },
            blackBackground: {
                100: "#313132",
                200: "#626263",
                300: "#939495",
                400: "#dcdddeff",
                500: "#f5f6f8",
                600: "#f7f8f9",
                700: "#f9fafb",
                800: "#fbfbfc",
                900: "#fdfdfe",
            },
            logoBlue: {
                    100: "#d8e6f0",
                    200: "#b1cde2",
                    300: "#8ab5d3",
                    400: "#639cc5",
                    500: "#3c83b6",
                    600: "#306992",
                    700: "#244f6d",
                    800: "#183449",
                    900: "#22303A",
            },
            logoGreen: {
                    100: "#ddf1ea",
                    200: "#bbe3d5",
                    300: "#9ad5c1",
                    400: "#78c7ac",
                    500: "#56b997",
                    600: "#459479",
                    700: "#346f5b",
                    800: "#224a3c",
                    900: "#11251e",
            },
            textfieldGray: {
                100: "#060606",
                200: "#0c0c0c",
                300: "#121212",
                400: "#181818",
                500: "#1e1e1e",
                600: "#4b4b4b",
                700: "#787878",
                800: "#a5a5a5",
                900: "#d2d2d2",
            },
            blue: {
                100: "#061e33",
                200: "#0c3b66",
                300: "#135999",
                400: "#1976cc",
                500: "#1f94ff",
                600: "#4ca9ff",
                700: "#79bfff",
                800: "#a5d4ff",
                900: "#d2eaff",
            },
            grayCard: {
                100: "#fbfbfb",
                200: "#f6f7f7",
                300: "#f2f2f4",
                400: "#edeef0",
                500: "#e9eaec",
                600: "#babbbd",
                700: "#8c8c8e",
                800: "#5d5e5e",
                900: "#2f2f2f"
            },
            bluegreen: {
                100: "#042521",
                200: "#084a42",
                300: "#0c6e64",
                400: "#109385",
                500: "#14b8a6",
                600: "#43c6b8",
                700: "#72d4ca",
                800: "#a1e3db",
                900: "#d0f1ed",
            },
            editGray: {
                100: "#131211",
                200: "#262423",
                300: "#383634",
                400: "#4b4846",
                500: "#5e5a57",
                600: "#7e7b79",
                700: "#9e9c9a",
                800: "#bfbdbc",
                900: "#dfdedd",
            },


            //cards
            blueCard: {
                100: "#f8fbfc",
                200: "#f1f6fa",
                300: "#eaf2f7",
                400: "#e3edf5",
                500: "#dce9f2",
                600: "#b0bac2",
                700: "#848c91",
                800: "#585d61",
                900: "#2c2f30"
            },
             greenCard: {
                100: "#f9fcfa",
                200: "#f3f9f5",
                300: "#eef5f0",
                400: "#e8f2eb",
                500: "#e2efe6",
                600: "#b5bfb8",
                700: "#888f8a",
                800: "#5a605c",
                900: "#2d302e"
            },
            orangeCard: {
                    100: "#fcfbf8",
                    200: "#faf6f0",
                    300: "#f7f2e9",
                    400: "#f5ede1",
                    500: "#f2e9da",
                    600: "#c2baae",
                    700: "#918c83",
                    800: "#615d57",
                    900: "#302f2c"
            },
            redCard: {
                    100: "#fdf4f3",
                    200: "#fbe9e7",
                    300: "#f8dedc",
                    400: "#f6d3d0",
                    500: "#f4d7d4ff",
                    600: "#c3a09d",
                    700: "#927876",
                    800: "#62504e",
                    900: "#312827"
            },
            purpleCard: {
                    100: "#f9f7fe",
                    200: "#f3effd",
                    300: "#eee7fc",
                    400: "#e8dffb",
                    500: "#e2d7fa",
                    600: "#b5acc8",
                    700: "#888196",
                    800: "#5a5664",
                    900: "#2d2b32"
            },
            blueChart: {
                    100: "#d4e8f4",
                    200: "#aad1e9",
                    300: "#7fbbdf",
                    400: "#55a4d4",
                    500: "#2a8dc9",
                    600: "#2271a1",
                    700: "#195579",
                    800: "#113850",
                    900: "#081c28"
            },
            purpleChart: {
                    100: "#dcdcf4",
                    200: "#b9bae9",
                    300: "#9597de",
                    400: "#7275d3",
                    500: "#4f52c8",
                    600: "#3f42a0",
                    700: "#2f3178",
                    800: "#202150",
                    900: "#101028"
            },
            orangeChart: {
                100: "#fdecce",
                200: "#fbd89d",
                300: "#f9c56d",
                400: "#f7b13c",
                500: "#f59e0b",
                600: "#c47e09",
                700: "#935f07",
                800: "#623f04",
                900: "#312002"
            },
            greenChart: {
                100: "#d3f3df",
                200: "#a7e8bf",
                300: "#7adc9e",
                400: "#4ed17e",
                500: "#22c55e",
                600: "#1b9e4b",
                700: "#147638",
                800: "#0e4f26",
                900: "#072713"
            },
            redChart: {
                100: "#fcdada",
                200: "#f9b4b4",
                300: "#f58f8f",
                400: "#f26969",
                500: "#ef4444",
                600: "#bf3636",
                700: "#8f2929",
                800: "#601b1b",
                900: "#300e0e"
            },
        }
    ),
})

//mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode ==='dark'
                ? {
                    background: {
                        default: colors.blackBackground[500]
                    },
                    primary: {
                        main: colors.logoBlue[500]
                    },
                    secondary: {
                        main: colors.logoGreen[500]
                    },
                    neutral: {
                        dark: colors.grayCard[700],
                        main: colors.grayCard[500],
                        light: colors.grayCard[100]
                    }
                } :{
                    background: {
                        default: colors.blackBackground[500]
                    },
                    primary: {
                        main: colors.logoBlue[100]
                    },
                    secondary: {
                        main: colors.logoGreen[500]
                    },
                    neutral: {
                        dark: colors.grayCard[700],
                        main: colors.grayCard[500],
                        light: colors.grayCard[100]
                    },
                }),
        },
        typography: {
            fontFamily: ["Poppins","sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Poppins","sans-serif"].join(","),
                fontSize: 36
            },
            h2: {
                fontFamily: ["Poppins","sans-serif"].join(","),
                fontSize: 32
            },
            h3: {
                fontFamily: ["Poppins","sans-serif"].join(","),
                fontSize: 16
            },
            h4: {
                fontFamily: ["Poppins","sans-serif"].join(","),
                fontSize: 14
            },
            h5: {
                fontFamily: ["Poppins","sans-serif"].join(","),
                fontSize: 13
            },
            h6: {
                fontFamily: ["Poppins","sans-serif"].join(","),
                fontSize: 12
            },

        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
        }),
        []
 
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}