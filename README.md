# 文件格式

{
  "players": [
    { "id": 0, "cards": ["2C", "3D", "4H", "5S","2C", "3D", "4H", "5S","2C", "3D", "4H", "5S","2C", "3D", "4H", "5S","2C", "3D", "4H", "5S"] },  
    { "id": 1, "cards": ["6C", "7D", "8H", "9S","6C", "7D", "8H", "9S","6C", "7D", "8H", "9S"] },
    { "id": 2, "cards": ["10C", "JD", "QH", "KS","10C", "JD", "QH", "KS","10C", "JD", "QH", "KS","10C", "JD", "QH", "KS"] },
    { "id": 3, "cards": ["AC", "2D", "3H", "4S","AC", "2D", "3H", "4S","AC", "2D", "3H", "4S","AC", "2D", "3H", "4S","AC", "2D", "3H", "4S","AC", "2D", "3H", "4S"] }
  ],
  "tributes": [
    { "from" : 0, "to": 3, "card": "5S" },
     { "from" : 3, "to": 0, "card": "2D" }
  ],
  "antiTributes": [
    {"from": 0, "reason": "U wish"}
  ],
  "playedCards": [
    { "player": 0, "cards": ["2C", "4H"] },
    { "player": 1, "cards": ["6C"] },
    { "player": 2, "cards": ["10C", "QH"] },
    { "player": 3, "cards": ["AC", "3H"] }
  ]  
}

# 说明：
1. tributes ：进贡
2. antiTributes: 抗贡
卡片名有两部分组成：
1. 点数： 2,3,.....9, 10, J, Q, K, A,
2. 花色：  C,D,H, S 
3. 特殊卡片：大小王：  HR and SB.
