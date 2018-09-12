from __future__ import print_function
from eval import evaluation
import sys
import zerorpc

class PythonApi(object):
    def eval(self, text): # define api 'eval'
        """based on the input text, return the int result"""
        try:
            return evaluation(text)
        except Exception as e:
            print(e)
            return 0.0

def main():
    addr = 'tcp://127.0.0.1:4242'
    s = zerorpc.Server(PythonApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()