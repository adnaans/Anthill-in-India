from bottle import *
from pyrcb.pyrcb import *
from time import sleep
import multiprocessing
from random import randint

nicklist = ["nkf1","YuvalForPres"]

homepage = """<html>
<body>
<form action="submit" method="post">
<p><label>Name: </label><input name="name" /></p>
<p><label>Email: </label><input name="email" /></p>
<p>Message:<br/><textarea name="message"></textarea></p>
<p><input type="submit" name="submit" /></p>
</form>
</body>
</html>"""

def sendIrc(name,email,lines):
    bot = IRCBot()
    bot.connect("irc.freenode.net",6667)
    bot.register("YFP2k16feedback")
    sleep(5)
    for nick in nicklist:
        bot.send(nick,"New message from {0}; reply to {1}".format(name,email))
        for i in lines:
            bot.send(nick,i.strip())
        bot.send(nick,"End message.")
        sleep(1)
        bot.send_raw("PONG")
    sleep(10)
    bot.quit()


@route("/")
def home():
    return homepage

@post("/submit")
def takeFeedback():
    name = request.forms.get("name")
    feedback = request.forms.get("message")
    lines = feedback.split("\n")
    email = request.forms.get("email")
    p = multiprocessing.Process(target=sendIrc, args=(name,email,lines,))
    p.start()
    redirect("/")

run(host="0.0.0.0",port=8085,debug=False)
