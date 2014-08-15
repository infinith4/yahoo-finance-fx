setwd("~/finance/yahoo-finance-fx");
data <- read.csv("data20140815.csv", header=FALSE);

#data[1,1];
#data[1,] #1行目のデータ
ids = unique(data[,1]) #1列目
ids

dates = unique(data[,4]) #日付：４列目
dates[1]


for( j in 1:length(ids)){
  eval(parse(text=paste(ids[j],"<-data[(data$V1==ids[",j,"]),]",sep="")))  
}


USDJPY_ylim <- c(min(USDJPY$V2,min(USDJPY$V3)),max(USDJPY$V2,USDJPY$V3))
jpeg(".jpg", height=500, width=500)
plot(USDJPY$V4,USDJPY$V2,type='l',ylim=USDJPY_ylim, col="blue")
par(new=T)
plot(USDJPY$V4,USDJPY$V3,type='l',ylab="",ylim=USDJPY_ylim,col="red")


EURJPY_ylim <- c(min(EURJPY$V2,min(EURJPY$V3)),max(EURJPY$V2,EURJPY$V3))
plot(EURJPY$V4,EURJPY$V2,type='l',ylim=EURJPY_ylim, col="blue")
par(new=T)
plot(EURJPY$V4,EURJPY$V3,type='l',ylab="",ylim=EURJPY_ylim,col="red")


x <- c(1, 2, 3, 4, 5)
y <- c(2, 4, 6, 8, 10)

jpeg("test1.jpg", height=500, width=500)
plot(x, y)                                   # グラフを描く
points(x, y)
dev.off()                                    # 描画デバイスを閉じる
