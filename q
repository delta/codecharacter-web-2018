[1mdiff --git a/api/utils/queueCompile.js b/api/utils/queueCompile.js[m
[1mindex d888d3e..c3e5d9c 100644[m
[1m--- a/api/utils/queueCompile.js[m
[1m+++ b/api/utils/queueCompile.js[m
[36m@@ -106,7 +106,7 @@[m [msetInterval(() => {[m
 							title: 'Compiled successfully!',[m
 							message: 'Your code just compiled.',[m
 							isRead: false,[m
[31m-							user_id: userId[m
[32m+[m							[32muser_id: Number(userId)[m
 						})[m
 							.then(notification => {[m
 								//idk what to do here[m
