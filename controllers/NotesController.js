const NoteHelper = require("../utils/NoteHelper");
const fs = require("fs");
const _ = require("lodash");
class NotesController {

    constructor() {
        this.status = 200;
        this.noteObj = new NoteHelper();
    }

    getStatus() {
            return this.status;
        }
        /**
         * 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         * ALgo Steps
         * 1)validate notes request
         * 2)if passed save the notes object in the db and return list
         */
    async save(req, res, next) {
        try {
            let user_id = req.params.id;
            const note_creds = _.pick(req.body, ["title", "body", "image"]);
            note_creds.user_id = user_id;
            console.log(req.file);
            if (req.file) {
                //var path = req.file.snapshot.path;
                // console.log(path);
                let imageData = fs.readFileSync(req.file.path);
                if (imageData != "") {
                    note_creds.image = imageData;
                    //note_creds.image = new Buffer(imageData.toString('base64'), "base64");
                    // a.image.contentType = 'image/png';
                }
                // console.log(imageData);

            }
            //console.log(note_creds);
            let validate_obj = this.noteObj.validate_with_err(note_creds);
            if (validate_obj.code != 200) {
                return validate_obj;
            } else {
                let notes_resp_obj = await this.noteObj.save(note_creds);
                return notes_resp_obj;
            }
        } catch (ex) {
            next(ex);
        }
    }

    async list(req, res, next) {
        try {
            let user_id = req.params.id;
            let note_query = {
                user_id: user_id
            };
            let fetch_obj = this.noteObj.fetch(note_query);
            return fetch_obj;
        } catch (ex) {
            next(ex);
        }
    }

    async update(req, res, next) {
        try {
            let user_id = req.params.id;
            let note_id = req.params.note_id;
            //console.log("note id ", note_id);
            let note_marked_req = _.pick(req.body, ["is_done"]);
            let note_query = {
                id: note_id,
                user_id: user_id
            };
            let update_query = note_marked_req;
            let updated_resp = await this.noteObj.update(update_query, note_query);
            return updated_resp;
        } catch (ex) {
            next(ex);
        }

    }
}

module.exports = NotesController;