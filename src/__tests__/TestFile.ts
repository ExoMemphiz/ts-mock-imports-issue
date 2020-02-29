import { ImportMock } from "ts-mock-imports";
import * as SomeClass from "../SomeClass";
import * as Utils from "../Utils";

interface IMock {
    restore(): void;
}

describe(`Testing SomeClass`, () => {
    let mocks: IMock;

    beforeEach(() => {
        if (mocks) {
            mocks.restore();
            mocks = null;
        }
    });

    test(`Can return without mocking`, () => {
        expect(SomeClass.dependentFunction("Test")).toBe("Hello Test");
    });

    test(`Can mock return as string`, () => {
        mocks = ImportMock.mockFunction(Utils, "someFunction", "Foo");
        expect(SomeClass.dependentFunction("Test")).toBe("Foo Test");
    });

    /* ↓ - This one doesn't work */
    test(`Can mock an error`, () => {
        mocks = ImportMock.mockFunction(Utils, "someFunction", () => {
            throw Error("This is an error");
        });
        expect(() => SomeClass.dependentFunction("Test")).toThrow(
            "This is an error",
        );
    });
});
