"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthResetPasswordDto = exports.AuthResetPasswordVerifyDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var AuthResetPasswordVerifyDto = /** @class */ (function () {
    function AuthResetPasswordVerifyDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], AuthResetPasswordVerifyDto.prototype, "mToken");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], AuthResetPasswordVerifyDto.prototype, "mUserId");
    return AuthResetPasswordVerifyDto;
}());
exports.AuthResetPasswordVerifyDto = AuthResetPasswordVerifyDto;
var AuthResetPasswordDto = /** @class */ (function (_super) {
    __extends(AuthResetPasswordDto, _super);
    function AuthResetPasswordDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.MaxLength)(30),
        (0, class_transformer_1.Type)(function () { return String; })
    ], AuthResetPasswordDto.prototype, "mPassword");
    return AuthResetPasswordDto;
}(AuthResetPasswordVerifyDto));
exports.AuthResetPasswordDto = AuthResetPasswordDto;
