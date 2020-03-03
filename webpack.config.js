const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [path.resolve(__dirname, "src", "index.tsx")],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            "@public": path.join(__dirname, "public")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images/",
                            limit: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("dart-sass")
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-cache": "ReactCache"
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
            ReactCache: "react-cache"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
