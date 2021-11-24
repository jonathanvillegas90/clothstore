import { Request, Response } from "express"
import UserSchema, { User } from "../models/user";
import PublicationSchema, { Publication } from "../models/publication";

export default class PublicationController {

    static async setPublication(req: Request, res: Response) {
        try {
            const { name, images } = req.body
            const publication: Publication = new PublicationSchema({ name, images });
            await publication.save();
            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }

    }

    static async getPublications(req: Request, res: Response) {
        try {
            console.log(">>> Lo lee  >>>");
            // const { filtros, order, page, name } = req.body
            let allPublications:Array<Publication>;
            allPublications = await PublicationSchema.find();
            res.json(allPublications);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

    static async putPublication(req: Request, res: Response) {
        try {
            // const { name, images } = req.body
            // const publication: Publication = new PublicationSchema({ name, images });
            // await publication.save();
            res.sendStatus(200);
        } catch (e) {
            // console.log(e)
            res.sendStatus(500)
        }
    }
    // putPublication


    // static async getUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { email, password } = req.query
    //         const user = await UserSchema.findOne({ email:email })
    //         if (user && user.password === password)
    //             res.json(user);
    //         else res.send("usuario o contraseña erronea")
    //     } catch (e) {
    //         console.log(e)
    //         res.sendStatus(500)
    //     }
    // }
}