from __future__ import print_function

import torch
import numpy as np
from model import getModel, test

def preprocessing(data):
    data = np.array(data)
    data = np.divide(data, 255)
    data = np.reshape(data, (1, 1, 28, 28))

    data = torch.FloatTensor(data)
    return data

def loadModel(model):
    # @TODO: Resolve to relative path
    path_pretrained_model = '../../src/mnist/pretrained_mnist_model.pkl'
    # @NOTE: Validate in gpu-mode
    # model.load_state_dict(torch.load(path_pretrained_model))
    model.load_state_dict(torch.load(path_pretrained_model, map_location=lambda storage, loc: storage))
    model.cpu()
    return model

def evaluation(input):
    print('input size: ', len(input))
    X = preprocessing(input)
    print('preprocessing data: ', X.shape)
    model = loadModel(getModel())
    # print('model: ', model)
    predict_num = test(X, model)
    raw_num_data = predict_num.item()
    print('predict_num: ', raw_num_data)
    return raw_num_data