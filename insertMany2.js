const { MongoClient } = require("mongodb");
// 下のURIをご自分の値に変更してください
const uri = "mongodb+srv://shu:Ve3525jgjr@cluster0.po3axwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("MongoDBに接続しました");
        
        const database = client.db('notes');
        const notes = database.collection('notes');
        
        // 既存データを削除（オプション）
        await notes.deleteMany({});
        console.log("既存データを削除しました");
        
        // データを登録
        const query = [
            { name: 'Yasushi', mail: 'osonoi@cu', tel: '1111' },
            { name: 'Koh', mail: 'kojima@cu', tel: '2222' },
            { name: 'Alice', mail: 'alice@example.com', tel: '3333' },
            { name: 'Bob', mail: 'bob@example.com', tel: '4444' },
            { name: 'Charlie', mail: 'charlie@example.com', tel: '5555' },
            { name: 'David', mail: 'david@example.com', tel: '6666' },
            { name: 'Eve', mail: 'eve@example.com', tel: '7777' },
            { name: 'Frank', mail: 'frank@example.com', tel: '8888' },
            { name: 'Grace', mail: 'grace@example.com', tel: '9999' },
            { name: 'Henry', mail: 'henry@example.com', tel: '0000' }
        ];
        
        const result = await notes.insertMany(query);
        console.log(`${result.insertedCount}件のデータを挿入しました`);
        console.log("挿入されたID:", result.insertedIds);
        
    } catch (error) {
        console.error("エラーが発生しました:", error);
    } finally {
        // 最後にクローズする
        await client.close();
        console.log("データベース接続を閉じました");
    }
}

run().catch(console.error);