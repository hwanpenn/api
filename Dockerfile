# FROM node:10.9.0  

# # Create app directory
# RUN mkdir -p /home/Service             
# WORKDIR /home/Service                  

# # Bundle app source
# COPY . /home/Service                   
# RUN npm install                        

# EXPOSE 8888
# CMD [ "npm", "start" ]

# 将官方 Python 运行时用作父镜像
FROM node:latest  

# 将工作目录设置为 /app
WORKDIR /10week

# 将当前目录内容复制到位于 /app 中的容器中
ADD . /10week

# 安装 requirements.txt 中指定的任何所需软件包
RUN npm install        

# 使端口 80 可供此容器外的环境使用
EXPOSE 7001

# 定义环境变量
ENV NAME World

# 在容器启动时运行 app.py
# CMD ["npm", "run", "dev"]egg-scripts start --port=7001 --title=10week-api 
CMD ["npm", "start"]