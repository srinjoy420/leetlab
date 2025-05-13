import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "you have to give a name to the playlist"
            })

        }
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not authorized"
            })
        }
        const playlist = await db.playlist.create({
            data: {
                name,
                description,
                userId
            }

        })
        res.status(200).json({
            success: true,
            message: "playlsit created succesfully",
            playlist
        })


    } catch (error) {
        console.log("error in creating", error);
        res.status(400).json({
            success: false,
            message: "not created"
        })


    }
}
export const getallplaylist = async (req, res) => {
    try {
        const playlists = await db.playlist.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        })
        res.status(200).json({
            success: true,
            message: "all playlsit fetched succesfully",
            playlists
        })

    } catch (error) {
        console.log("fetcher error all playlists", error);
        res.status(400).json({
            success: false,
            message: "playlsit fetched unsuccesfully",

        })


    }

}
export const getplaylistbyId = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await db.playlist.findMany({
            where: {
                id: playlistId,
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        })
        if (!playlist) {
            return res.status(404).json({
                success: false,
                error: "no playlist",

            })

        }
        res.status(200).json({
            success: true,
            message: "all playlsit fetched succesfully",
            playlist
        })

    } catch (error) {
        console.log("error fetching", error);
        res.status(400).json({
            success: false,
            error: " playlsit fetched unsuccesfully",

        })


    }
}


export const addProblemtoPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const userId = req.user.id;
        const { problemId } = req.body
        // if(!Array.isArray(problemIds)||problemIds.length===0){
        //     return res.status(400).json({
        //         success:false,
        //         error:"give a  valid problem id"
        //     })
        // }
        if (problemId.length === 0) {
            return res.status(400).json({
                success: false,
                error: "give a  valid problem id"
            })

        }
        //create record for each problem
        const Prpblemsinplaylist = await db.probleminPlaylist.create({
           data:{
            problemId,
            playlistId
           }

        })
        res.status(200).json({
            success: true,
            message: "add problem succesfully to the playlist",
            Prpblemsinplaylist
        })
    } catch (error) {
        console.log("error in adding a problem", error);
        res.status(400).json({
            success: false,
            error: " problem didnot add  to the playlist"

        })


    }
}
export const deleteplayList = async (req, res) => {
    const { playlistId } = req.params;
    try {
        // ✅ Check if the playlist exists
        const playlist = await db.playlist.findUnique({
            where: { id: playlistId },
        });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
                success: false,
            });
        }

        // ✅ Proceed to delete if it exists
        const deleted = await db.playlist.delete({
            where: { id: playlistId },
        });

        res.status(200).json({
            message: "Playlist deleted successfully",
            success: true,
            deleted,
        });
    } catch (error) {
        console.error("Error deleting playlist:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const deleteproblemPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { id } = req.body;
    try {
       if(id.length===0){
        return  res.status(400).json({
            success: false,
            message: "playlsit fetched unsuccesfully",

        })


       }
        const deletedProblem = await db.probleminPlaylist.delete({
            where:{
                id,
                playlistId
            }
           
        })
        res.status(200).json({
            message: "deleted succesfully",
            deletedProblem
        })
    } catch (error) {
        console.log("cant delete", error);
        res.status(400).json({
            message: "cant delete"
        })


    }
}