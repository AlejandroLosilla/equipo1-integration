import { describe, it, expect, vi } from "vitest";
import { PostLoginUserController } from "./PostLoginUserController.js";

describe("PostLoginUserController", () => {
    const email = "hola@hola.com"
    const password = "123456"
    let res = {
        status: vi.fn()
    }
    const loginUser = {
        execute: vi.fn()
    }
    const postLoginUserController = new PostLoginUserController(loginUser)
    
    it("check if user has succesfully logged in", async () => {


        const req = {
            body: {
                email,
                password
            },
        }

        await postLoginUserController.execute(req, res)

        expect(loginUser.execute).toHaveBeenCalled(email, password)
    })

    it("responds with status 200 when user is logged", async () => {
        const req = {
            body: {
                email,
                password
            }
        }
        await postLoginUserController.execute(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })
})