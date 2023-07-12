const fs = require('fs');

// ファイルを読み込む
fs.readFile('pokemon-list.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // 改行文字でデータを分割する
    const lines = data.split('\n');

    // ヘッダー行を削除する
    lines.shift();

    // 出力先のファイルを作成する
    const outputFilePath = 'output.txt';

    // ファイルを開いてデータを書き込む
    const fileStream = fs.createWriteStream(outputFilePath);
    fileStream.on('error', (err) => {
        console.error(err);
    });

    // 各行のデータを処理する
    lines.forEach((line) => {
        // タブ文字でデータを分割する
        const [id, name, hp, attack, defence, spAttack, spDefence, speed, total] = line.split('\t');

        // データを出力する
        const output = `db.Create(&entity.Pokemon{PokemonId: ${id}, Name: "${name}", Hp: ${hp}, Attack: ${attack}, Defence: ${defence}, SpAttack: ${spAttack}, SpDefence: ${spDefence}, Speed: ${speed}, Total: ${total.trim()}})\n`;

        // ファイルに書き込む
        fileStream.write(output);
    });

    // ファイルを閉じる
    fileStream.end();
});