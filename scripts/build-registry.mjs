import {readFile,mkdir,writeFile} from 'node:fs/promises';
const registry=JSON.parse(await readFile('registry.json','utf8'));
// Relative metadata keeps the release portable across hosting providers.
registry.homepage=process.env.REGISTRY_ORIGIN ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:5173');
await mkdir('public/r',{recursive:true});
for(const item of registry.items){
 const files=await Promise.all(item.files.map(async f=>({...f,content:await readFile(f.path,'utf8')})));
 await writeFile(`public/r/${item.name}.json`,JSON.stringify({$schema:'https://ui.shadcn.com/schema/registry-item.json',...item,files},null,2));
}
await writeFile('public/r/registry.json',JSON.stringify(registry,null,2));
