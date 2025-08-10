const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.resolve(__dirname, '../teste.txt');

test('teste.txt existe e não está vazio', async () => {
	// Verifica acesso ao arquivo
	await fs.access(filePath);
	// Lê e verifica conteúdo
	const data = await fs.readFile(filePath, 'utf8');
	assert.ok(data.trim().length > 0, 'teste.txt deve conter conteúdo');
});
