//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
    string private greeting;
    constructor(string memory _greeting) {
        greeting = _greeting;
    }
}