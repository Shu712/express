var express = require('express');
var router = express.Router();

// MongoDBに接続するための設定
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://shu:Ve3525jgjr@cluster0.po3axwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// ノート情報を1件取得するAPI
router.get('/', async (req, res) => {
    try {
        // データベースとコレクションの指定
        const database = client.db('notes');
        const notes = database.collection('notes');

        // idが2のドキュメントを取得
        const query = { id: 2 };
        const note = await notes.findOne(query);

        // 結果を返す
        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).send("データ取得中にエラーが発生しました");
    }
});

module.exports = router;

