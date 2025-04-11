provider "aws" {
  region = "ap-south-1"
}

# Generate new SSH key
resource "tls_private_key" "new_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

#  Create key pair in AWS using public key
resource "aws_key_pair" "generated_key" {
  key_name   = "terraform-key"
  public_key = tls_private_key.new_key.public_key_openssh
}

#  Save the private key locally with correct permissions
resource "local_file" "save_key" {
  content              = tls_private_key.new_key.private_key_pem
  filename             = "${path.module}/terraform-key.pem"
  file_permission      = "0400"
  directory_permission = "0700"
}

#  VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "AbdurVPC"
  }
}

#  Subnet
resource "aws_subnet" "my_subnet" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "AbdurSubnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "AbdurIGW"
  }
}

# Route Table
resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "AbdurRouteTable"
  }
}

# Associate Route Table with Subnet
resource "aws_route_table_association" "rt_assoc" {
  subnet_id      = aws_subnet.my_subnet.id
  route_table_id = aws_route_table.route_table.id
}


#  Security Group
resource "aws_security_group" "backend_sg" {
  name        = "backend-sg"
  description = "Allow SSH and backend ports"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# S3 bucket (optional)
resource "aws_s3_bucket" "artifact_bucket" {
  bucket = "abdur-backend-artifacts-2025"
  acl    = "private"

  tags = {
    Name        = "ArtifactBucket"
    Environment = "Dev"
  }
}

#  EC2 Instance
resource "aws_instance" "backend_ec2" {
  ami                         = "ami-0e35ddab05955cf57" # Ubuntu 22.04 LTS (ap-south-1)
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.generated_key.key_name
  subnet_id                   = aws_subnet.my_subnet.id
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.backend_sg.id]

  tags = {
    Name = "Backend-Server"
  }

  # Set correct file permission automatically after creation
  provisioner "local-exec" {
    command = "chmod 400 ${path.module}/terraform-key.pem"
  }
}

#  Output: EC2 Public IP
output "backend_instance_public_ip" {
  value = aws_instance.backend_ec2.public_ip
}


output "ansible_inventory" {
  value = <<EOT
[web]
${aws_instance.backend_ec2.public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=${path.module}/terraform-key.pem
EOT
}
