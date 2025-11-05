const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressImages() {
  try {
    const imagesDir = path.join(__dirname, '../public/images');
    
    // 压缩 ai-tech-illustration.png
    const aiTechPath = path.join(imagesDir, 'ai-tech-illustration.png');
    const aiTechTemp = path.join(imagesDir, 'ai-tech-illustration-temp.png');
    
    if (fs.existsSync(aiTechPath)) {
      const aiTechInfo = await sharp(aiTechPath).metadata();
      console.log(`原始 ai-tech-illustration.png: ${aiTechInfo.width}x${aiTechInfo.height}, 大小: ${(fs.statSync(aiTechPath).size / 1024 / 1024).toFixed(2)} MB`);
      
      await sharp(aiTechPath)
        .resize(aiTechInfo.width, aiTechInfo.height, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .png({
          quality: 80,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(aiTechTemp);
      
      // 删除原文件并重命名临时文件
      fs.unlinkSync(aiTechPath);
      fs.renameSync(aiTechTemp, aiTechPath);
      
      const compressedAiTechInfo = await sharp(aiTechPath).metadata();
      console.log(`压缩后 ai-tech-illustration.png: ${compressedAiTechInfo.width}x${compressedAiTechInfo.height}, 大小: ${(fs.statSync(aiTechPath).size / 1024 / 1024).toFixed(2)} MB`);
    }
    
    // 压缩 team-scene.png
    const teamScenePath = path.join(imagesDir, 'team-scene.png');
    const teamSceneTemp = path.join(imagesDir, 'team-scene-temp.png');
    
    if (fs.existsSync(teamScenePath)) {
      const teamSceneInfo = await sharp(teamScenePath).metadata();
      console.log(`原始 team-scene.png: ${teamSceneInfo.width}x${teamSceneInfo.height}, 大小: ${(fs.statSync(teamScenePath).size / 1024 / 1024).toFixed(2)} MB`);
      
      await sharp(teamScenePath)
        .resize(teamSceneInfo.width, teamSceneInfo.height, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .png({
          quality: 80,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(teamSceneTemp);
      
      // 删除原文件并重命名临时文件
      fs.unlinkSync(teamScenePath);
      fs.renameSync(teamSceneTemp, teamScenePath);
      
      const compressedTeamSceneInfo = await sharp(teamScenePath).metadata();
      console.log(`压缩后 team-scene.png: ${compressedTeamSceneInfo.width}x${compressedTeamSceneInfo.height}, 大小: ${(fs.statSync(teamScenePath).size / 1024 / 1024).toFixed(2)} MB`);
    }
    
    console.log('图片压缩完成!');
  } catch (error) {
    console.error('压缩图片时出错:', error);
  }
}

compressImages();