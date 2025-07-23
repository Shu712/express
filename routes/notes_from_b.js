var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

// CORSの設定を追加
const cors = require('cors');
router.use(cors());

// 重要: MongoDB AtlasのURIを使用（ローカルのlocalhost:27017ではない）
const uri = "mongodb+srv://shu:Ve3525jgjr@cluster0.po3axwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("使用しているMongoDB URI:", uri); // デバッグ用

/* GET notes from database */
router.get('/', async function(req, res, next) {
    const client = new MongoClient(uri); // 各リクエストで新しいクライアントを作成
    
    try {
        console.log("MongoDBへの接続を開始...");
        
        // MongoDBに接続（タイムアウトを設定）
        await client.connect();
        console.log("MongoDB Atlas接続成功");
        
        // データベースとコレクションを選択
        const database = client.db('notes');
        const notes = database.collection('notes');
        
        // 全てのデータを取得
        const allNotes = await notes.find({}).toArray();
        console.log("取得したデータ数:", allNotes.length);
        
        if (allNotes.length > 0) {
            console.log("サンプルデータ:", allNotes[0]);
        }
        
        // レスポンスを返す
        res.json(allNotes);
        
    } catch (error) {
        console.error("データベースエラー詳細:", error);
        res.status(500).json({ 
            error: "データベースエラー", 
            details: error.message,
            type: error.constructor.name
        });
    } finally {
        // 接続を閉じる
        try {
            await client.close();
            console.log("MongoDB接続を閉じました");
        } catch (closeError) {
            console.error("接続クローズエラー:", closeError);
        }
    }
});

module.exports = router;