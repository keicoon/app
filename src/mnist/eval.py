from __future__ import print_function

import torch
import numpy as np
from model import getModel, test

def preprocessing(data):
    data = np.array(data)
    data = np.divide(data, 255)
    data = np.reshape(data, (1, 28, 28))

    return data

def loadModel(mnistModel):
    path_pretrained_model = './pretrained_mnist_model.pkl'
    model.load_state_dict(torch.load(path_pretrained_model))

    return model

def evaluation(input):
    print('input size: ', len(input))
    X = preprocessing(input)
    print('preprocessing data: ', X.shape)
    model = loadModel(getModel())
    print('model: ', model)
    predict_num = test(X, model)
    print('predict_num: ', predict_num)
    return predict_num