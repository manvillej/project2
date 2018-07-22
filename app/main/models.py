
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