const mysql=require("mysql")

const con=mysql.createPool({
    connectionLimit:10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    pass : process.env.DB_PASS,
    database : process.env.DB_NAME  
})

exports.view=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from studen_lists",(err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});
            }else{
                console.log("error Listing Date"+err);
            }
        })
    })
};

exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        const{name,age,city}=req.body;
        connection.query("insert into studen_lists(name,age,city) values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User details added success"});
            }else{
                console.log("error Listing Date"+err);
            }
        })
    })
}
exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        let id=req.params.id;
        connection.query("select * from studen_lists where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{rows});
            }else{
                console.log("error Listing Date"+err);
            }
        })
    }) 
}
exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        const{name,age,city}=req.body;
        let id=req.params.id;
        connection.query("update studen_lists set name=?,age=?,city=? where id=?",[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
                con.getConnection((err,connection)=>{
                    if(err) throw err;
                    let id=req.params.id;
                    connection.query("select * from studen_lists where id=?",[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render("edituser",{rows, msg:"User details changed success"});
                        }else{
                            console.log("error Listing Date"+err);
                        }
                    })
                }) 
            }else{
                console.log("error Listing Date"+err);
            }
        })
    })
}

exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        let id=req.params.id;
        connection.query("delete from studen_lists where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect('/');
            }else{
                if(err) throw err;
            }
        })
    })
}