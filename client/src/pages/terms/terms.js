"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./terms.scss");
var framer_motion_1 = require("framer-motion");
var home_1 = require("../home/home");
var Navbar_1 = __importDefault(require("../../components/Navbar/Navbar"));
var SideNav_1 = __importDefault(require("../../components/SideNav/SideNav"));
var Footer_1 = __importDefault(require("../../components/Footer/Footer"));
function Terms() {
    var _a = react_1.useState(false), isSideOpen = _a[0], setIsSideOpen = _a[1];
    var toggleOpen = function () { return setIsSideOpen(!isSideOpen); };
    return (react_1.default.createElement(framer_motion_1.motion.div, { initial: "initial", animate: "in", exit: "out", variants: home_1.pageVariants, transition: home_1.pageTransition, style: {
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            overflowX: "hidden",
        } },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement(Navbar_1.default, null),
            react_1.default.createElement(SideNav_1.default, { toggleOpen: toggleOpen, isOpen: isSideOpen }),
            react_1.default.createElement("div", { className: "terms-container" },
                react_1.default.createElement("h1", { className: "title main-title" }, "ChatApp terms of service"),
                react_1.default.createElement("p", { className: "update-info" }, "Last updated: July 12, 2020"),
                react_1.default.createElement("h1", { className: "title" }, "Nulla facilisi"),
                react_1.default.createElement("p", { className: "content" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet tempus dolor, eget suscipit tellus tempor vitae. Quisque pulvinar purus sit amet justo aliquam, eu condimentum enim vestibulum. Ut porttitor eros at quam varius facilisis. Sed iaculis, magna ullamcorper laoreet condimentum, sem leo porttitor leo, id vulputate tellus nisl ac neque. Cras vitae finibus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla gravida malesuada nunc a sollicitudin. Suspendisse potenti. Donec finibus feugiat tortor. Praesent a lectus eu sem mattis cursus nec nec metus. Praesent nec vestibulum erat. Maecenas elementum orci et nibh sollicitudin varius sit amet sit amet est. Curabitur augue magna, sollicitudin ac ante sed, posuere blandit metus. In lectus dui, auctor nec congue ac, condimentum sed nibh. Phasellus ac erat auctor, tincidunt leo in, facilisis diam."),
                react_1.default.createElement("h1", { className: "title" }, "Nam eu commodo nibh"),
                react_1.default.createElement("p", { className: "content" }, "Proin sed ex sit amet ipsum aliquam lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam efficitur tristique vulputate. Quisque pharetra hendrerit tristique. Phasellus a lorem vitae risus consectetur blandit sed placerat mi. Nullam libero libero, rutrum vel finibus sit amet, laoreet id tellus. Nullam quis est pretium, iaculis nisi non, auctor sem. Maecenas ullamcorper est volutpat imperdiet eleifend. Donec a tortor non enim cursus tincidunt in vitae sapien. In hac habitasse platea dictumst. Cras tempor ligula sit amet pretium finibus. Duis ac ligula eget eros iaculis placerat. Sed et ultrices neque. Donec purus ex, condimentum eu lorem eget, condimentum dictum libero. Nam eu augue eros."),
                react_1.default.createElement("h1", { className: "title" }, "Pellentesque a ante"),
                react_1.default.createElement("p", { className: "content" }, "Curabitur ut sapien lectus. Maecenas vehicula id lectus a iaculis. Nulla quis placerat magna. Praesent varius, nisi non tempor finibus, urna nisl molestie mauris, eget ornare libero ipsum ut mauris. Ut id velit ut velit consectetur placerat. Aenean finibus massa in nunc tempus cursus. Aenean cursus viverra iaculis. Sed posuere nunc urna, at posuere ex convallis non. Sed eu eros nec justo bibendum rutrum. Vivamus sit amet lorem fermentum, venenatis enim ac, varius arcu. Nam ultricies varius turpis, quis molestie libero tempor sed. Curabitur quis pharetra ligula.F"),
                react_1.default.createElement("h1", { className: "title" }, "Morbi nec molestie ex"),
                react_1.default.createElement("p", { className: "content" }, "Suspendisse tristique, leo eu aliquet laoreet, ex magna pulvinar enim, ut consectetur eros erat quis mauris. Praesent accumsan rutrum lectus at varius. Aliquam magna nisi, dapibus at porttitor eget, venenatis non leo. Aliquam laoreet risus orci, quis aliquet mauris vestibulum sit amet. Duis magna neque, fringilla eu ipsum quis, sodales imperdiet mauris. Nunc in blandit odio. Fusce a erat sed ipsum tincidunt accumsan. Praesent eget nisi fermentum, ornare massa ut, euismod velit. Pellentesque vel malesuada quam, a finibus tortor. Fusce dictum diam at eros eleifend, eget fermentum ligula vestibulum. Curabitur consequat lacinia nunc eu pulvinar. Praesent ultrices felis nisi, ultrices hendrerit dui commodo interdum."),
                react_1.default.createElement("h1", { className: "title" }, "Ut feugiat at lorem et congue"),
                react_1.default.createElement("p", { className: "content" }, "Suspendisse rhoncus facilisis nibh, consequat euismod justo pretium non. Nulla fringilla quam ac ultrices imperdiet. Maecenas molestie nisl vel est imperdiet, semper elementum lacus molestie. Maecenas ac nisl eget justo sagittis faucibus vitae eu neque. Cras non massa lacus. Fusce quis pulvinar lorem. Integer at odio felis. Cras pulvinar odio ut suscipit sollicitudin. Curabitur a vehicula odio, auctor fermentum turpis. Sed aliquet vitae justo id fringilla. Donec eleifend pellentesque dui, non porta tortor posuere at. Morbi varius porttitor massa, eget commodo libero tristique a. Quisque metus felis, blandit eget sapien id, finibus blandit erat."),
                react_1.default.createElement("h1", { className: "title" }, "Sed interdum"),
                react_1.default.createElement("p", { className: "content" }, "Mauris tincidunt accumsan dui, quis malesuada diam egestas ut. Vestibulum non accumsan justo, quis dignissim est. Vestibulum dictum lacus a aliquam bibendum. Donec ullamcorper felis at lacus hendrerit, sed varius ante pretium. Sed quis velit nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque orci est, lacinia sed congue eget, tempor id sem. Aenean dignissim ornare eleifend. Nunc condimentum vehicula gravida."),
                react_1.default.createElement("h1", { className: "title" }, "Aenean nec enim justo"),
                react_1.default.createElement("p", { className: "content" }, "Pellentesque at facilisis quam. Donec sem mauris, sodales nec risus hendrerit, vehicula molestie sem. Duis efficitur diam id justo finibus dignissim. Curabitur placerat magna nec felis faucibus vulputate. Nulla facilisi. Sed aliquam enim vel lacus auctor maximus. Aenean vehicula pulvinar maximus. Duis eros leo, ornare eget justo scelerisque, dignissim sodales orci. Donec ac tincidunt eros, in tempus quam. Donec euismod at turpis ac dictum. Quisque justo magna, tincidunt ac velit in, efficitur faucibus nunc. Sed nec lacus ac ante pulvinar tincidunt sit amet ut nunc. Mauris nisl justo, mattis pretium ullamcorper in, varius nec tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."),
                react_1.default.createElement("h1", { className: "title" }, "Sed interdum, eros eget tincidunt"),
                react_1.default.createElement("p", { className: "content" }, "Cras laoreet ut lacus at blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat, tortor vel hendrerit eleifend, ante magna feugiat purus, laoreet porttitor purus tellus eu eros. Donec eu odio massa. Integer ut posuere urna. Duis at turpis facilisis ipsum ornare egestas ac at libero. Etiam dolor justo, molestie quis diam eu, auctor feugiat felis. Nullam malesuada velit et venenatis auctor. Donec ullamcorper augue sed ipsum eleifend, a scelerisque diam rutrum. Aenean ut leo vel tortor pretium molestie. Donec viverra faucibus turpis, eget ultricies eros vehicula vel. Suspendisse potenti."))),
        react_1.default.createElement(Footer_1.default, null)));
}
exports.default = Terms;
