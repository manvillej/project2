
channels = ["general"]

class Channels(object):
	def getChannels():
		""""""
		return channels

	def addChannel(channel):
		""""""
		if channel in channels:
			return False

		channels.append(channel)

		return True


messages = {}

class Messages(object):
	"""docstring for Messages"""
	def getMessages(channel):
		return messages.get(channel, [])

	def addMessage(channel, message, username, time):
		if(messages.get(channel, False)):
			messages[channel].append({"message":message, "username":username, "time":time})
		else:
			messages[channel] = [{"message":message, "username":username, "time":time}]
		
		if( len(messages[channel]) > 100):
			messages[channel]=messages[channel][1:]

	
		