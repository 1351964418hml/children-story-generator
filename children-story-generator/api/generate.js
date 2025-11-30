module.exports = async (request, response) => {
  // 设置CORS头
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: '只支持POST请求' });
  }

  try {
    const { childName, childAge, gender, characterType, theme, setting, moral } = request.body;

    // 模拟故事生成
    const story = `
在遥远的${setting}里，住着一位名叫${childName}的${characterType}。${childName}是一个充满好奇心的${gender}，总是梦想着探索世界的每一个角落。

一天，${childName}在森林里发现了一张神秘的地图，上面标记着一个隐藏的宝藏。这个宝藏据说能实现发现者的一个愿望！${childName}毫不犹豫地决定踏上寻找宝藏的旅程。

旅途中，${childName}遇到了许多挑战。首先是一条宽阔的河流挡住了去路。${childName}没有放弃，而是仔细观察周围，发现了一些漂浮的木头。聪明的${characterType}用藤蔓把这些木头绑在一起，做成了一艘简易的木筏，成功渡过了河流。

接着，${childName}遇到了一只迷路的小鸟。尽管急着寻找宝藏，但${childName}还是停下来帮助小鸟找到了回家的路。为了表示感谢，小鸟告诉${childName}一条通往宝藏的近路。

经过不懈努力，${childName}终于找到了宝藏！那是一个闪闪发光的宝箱，里面没有金银珠宝，而是一面神奇的镜子。当${childName}看向镜子时，看到的不是自己的倒影，而是所有帮助过${childName}的朋友和一路上学到的宝贵经验。

${childName}突然明白了，真正的宝藏不是物质财富，而是${theme}的过程中获得的成长和友谊。${childName}带着这个珍贵的领悟回到了家，与家人和朋友分享了这段奇妙的经历。

${moral || '这个故事告诉我们，勇敢面对挑战、帮助他人，我们会发现生活中最珍贵的宝藏。'}
    `.trim();

    const illustration_prompts = [
      `${childName}作为${characterType}在${setting}中开始冒险`,
      `${childName}用智慧和勇气克服旅途中的困难`,
      `${childName}与朋友们一起庆祝成功，展现${theme}的真谛`
    ];

    response.status(200).json({
      story,
      illustration_prompts
    });
    
  } catch (error) {
    console.error('生成故事错误:', error);
    response.status(500).json({ 
      error: '故事生成失败，请稍后重试',
      details: error.message 
    });
  }
};
