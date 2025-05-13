import express from 'express';
import {authMidleware} from "../middleware/auth.middleware.js"
import {getallplaylist,getplaylistbyId,createPlaylist,addProblemtoPlaylist,deleteplayList,deleteproblemPlaylist} from "../controller/playlist.controller.js"
const playlistRoutes=express.Router();

playlistRoutes.get("/",authMidleware,getallplaylist)
playlistRoutes.get("/:playlistId",authMidleware,getplaylistbyId)
playlistRoutes.post("/create-playlist",authMidleware,createPlaylist)
playlistRoutes.post("/:playlistId/add-problem",authMidleware,addProblemtoPlaylist)
playlistRoutes.delete("/:playlistId",authMidleware,deleteplayList)
playlistRoutes.delete("/:playlistId/remove-problem",authMidleware,deleteproblemPlaylist)


export default playlistRoutes