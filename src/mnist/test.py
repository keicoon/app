from __future__ import print_function

import torch
import numpy as np
from model import getModel, test

import torchvision.datasets as dsets
import torchvision.transforms as transforms

def preprocessing():
    test_dataset = dsets.MNIST(root='./data',
                           train=False,
                           transform=transforms.ToTensor(),
                           download=True)

    test_loader = torch.utils.data.DataLoader(dataset=test_dataset,
                                          batch_size=1,
                                          shuffle=False)

    for images, labels in test_loader:
        data = images
        break
    return data

def loadModel(model):
    path_pretrained_model = './pretrained_mnist_model.pkl'
    model.load_state_dict(torch.load(path_pretrained_model))

    return model

def evaluation():
    X = preprocessing()
    print('preprocessing data: ', X.shape, X)
    model = loadModel(getModel())
    print('model: ', model)
    predict_num = test(X, model)
    print('predict_num: ', predict_num)
    return predict_num

evaluation()